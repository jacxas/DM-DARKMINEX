/**
 * API client for DM-DARKMINEX
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export async function generateChamber(depth: number, mineType: string = 'dark') {
  const response = await fetch(`${API_BASE}/api/generate-chamber`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ depth, mineType }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to generate chamber');
  return data;
}

export async function generateEncounter(difficulty: string = 'medium', partyLevel: number = 5) {
  const response = await fetch(`${API_BASE}/api/generate-encounter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ difficulty, partyLevel }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to generate encounter');
  return data;
}

export async function generateTreasure(rarity: string = 'common', depth: number = 1) {
  const response = await fetch(`${API_BASE}/api/generate-treasure`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rarity, depth }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to generate treasure');
  return data;
}

export const battle = {
  calculateInitiative: async (combatants: any[]) => {
    const response = await fetch(`${API_BASE}/api/battle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'calculate-initiative', combatants }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to calculate initiative');
    return data;
  },

  applyDamage: async (combatantId: string, damage: number, currentHp: number) => {
    const response = await fetch(`${API_BASE}/api/battle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'apply-damage', combatantId, damage, currentHp }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to apply damage');
    return data;
  },

  nextTurn: async (currentTurn: number, combatants: any[]) => {
    const response = await fetch(`${API_BASE}/api/battle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'next-turn', currentTurn, combatants }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to advance turn');
    return data;
  },
};
