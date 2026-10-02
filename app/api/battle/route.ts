import { NextResponse } from 'next/server';

interface Combatant {
  id: string;
  name: string;
  initiative: number;
  hp: number;
  maxHp: number;
  ac: number;
  isAlly: boolean;
  dexMod?: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, combatants = [] } = body;

    if (action === 'calculate-initiative') {
      const withInitiative = combatants.map((c: Combatant) => ({
        ...c,
        initiative: Math.floor(Math.random() * 20) + 1 + (c.dexMod || 0),
      }));

      const sorted = withInitiative.sort(
        (a: Combatant, b: Combatant) => b.initiative - a.initiative
      );

      return NextResponse.json({
        success: true,
        battleOrder: sorted,
        currentTurn: 0,
        round: 1,
      });
    }

    if (action === 'apply-damage') {
      const { combatantId, damage, currentHp } = body;
      return NextResponse.json({
        success: true,
        message: `${damage} damage applied to ${combatantId}`,
        newHp: Math.max(0, (currentHp || 0) - damage),
      });
    }

    if (action === 'next-turn') {
      const { currentTurn, combatants: allCombatants } = body;
      if (!Array.isArray(allCombatants) || allCombatants.length === 0) {
        return NextResponse.json(
          { error: 'No combatants provided' },
          { status: 400 }
        );
      }

      const nextTurn = (currentTurn + 1) % allCombatants.length;
      const nextCombatant = allCombatants[nextTurn];

      return NextResponse.json({
        success: true,
        currentTurn: nextTurn,
        currentCombatant: nextCombatant,
        message: `${nextCombatant.name}'s turn!`,
      });
    }

    return NextResponse.json(
      { error: 'Unknown battle action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Battle action error:', error);
    return NextResponse.json(
      { error: 'Failed to process battle action', details: error.message },
      { status: 500 }
    );
  }
}
