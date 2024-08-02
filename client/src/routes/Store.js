import { writable } from 'svelte/store';

// Maps id to { id: string, name: string, cards: [{ front: string, back: string }, ...] }
export const store = writable({
    "1": {
        id: "1",
        name: "Quadratic Equations",
        cards: [
            { front: "Solve for $$x$$: $$x + 3= 5$$", back: "$$x = 2$$" },
            { front: "Quadratic formula", back: "$$x = \\frac {-b \\pm \\sqrt{b^2 -4ac}} {2a}$$" }
        ]
    }
});

export default store;