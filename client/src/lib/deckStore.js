import { writable } from "svelte/store";

// Maps id to { id: string, name: string, cards: [{ front: string, back: string }, ...] }
export const store = writable({
    "1": {
        id: "1",
        name: "Quadratic Equations",
        cards: [
            { front: "Solve for $$x$$: $$x + 3 = 5$$", back: "$$x = 2$$" },
            { front: "Quadratic formula", back: "$$x = \\frac {-b \\pm \\sqrt{b^2 - 4ac}} {2a}$$" }
        ]
    },
    "2": {
        id: "2",
        name: "Algebra Basics",
        cards: [
            { front: "Simplify: $$2(x + 3) - 4$$", back: "$$2x + 2$$" },
            { front: "Factor: $$x^2 - 9$$", back: "$$(x - 3)(x + 3)$$" }
        ]
    },
    "3": {
        id: "3",
        name: "Geometry",
        cards: [
            { front: "Area of a circle with radius $$r$$", back: "$$\\pi r^2$$" },
            { front: "Volume of a cylinder with radius $$r$$ and height $$h$$", back: "$$\\pi r^2 h$$" }
        ]
    },
    "4": {
        id: "4",
        name: "Trigonometry",
        cards: [
            { front: "Sine of 45 degrees", back: "$$\\frac{\\sqrt{2}}{2}$$" },
            { front: "Cosine of 60 degrees", back: "$$\\frac{1}{2}$$" }
        ]
    },
    "5": {
        id: "5",
        name: "Calculus",
        cards: [
            { front: "Derivative of $$x^2$$", back: "$$2x$$" },
            { front: "Integral of $$x^2$$", back: "$$\\frac{x^3}{3} + C$$" }
        ]
    },
    "6": {
        id: "6",
        name: "Statistics",
        cards: [
            { front: "Mean of $$[1, 2, 3, 4, 5]$$", back: "$$3$$" },
            { front: "Standard deviation formula", back: "$$\\sqrt{\\frac{\\sum{(x_i - \\mu)^2}}{N}}$$" }
        ]
    },
    "7": {
        id: "7",
        name: "Linear Algebra",
        cards: [
            { front: "Matrix multiplication example: $$A \\cdot B$$", back: "Matrix result" },
            { front: "Determinant of $$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$$", back: "$$ad - bc$$" }
        ]
    },
    "8": {
        id: "8",
        name: "Number Theory",
        cards: [
            { front: "Prime factors of 28", back: "$$2^2 \\cdot 7$$" },
            { front: "Greatest common divisor of 48 and 18", back: "$$6$$" }
        ]
    },
    "9": {
        id: "9",
        name: "Probability",
        cards: [
            { front: "Probability of rolling a 3 on a fair die", back: "$$\\frac{1}{6}$$" },
            { front: "Probability of drawing an ace from a deck of cards", back: "$$\\frac{4}{52} = \\frac{1}{13}$$" }
        ]
    },
    "10": {
        id: "10",
        name: "Complex Numbers",
        cards: [
            { front: "Addition of $$3 + 4i$$ and $$1 - 2i$$", back: "$$4 + 2i$$" },
            { front: "Magnitude of $$3 + 4i$$", back: "$$5$$" }
        ]
    },
    "11": {
        id: "11",
        name: "Differential Equations",
        cards: [
            { front: "Solve $$\\frac{dy}{dx} = 3y$$", back: "$$y = Ce^{3x}$$" },
            { front: "Second-order differential equation $$\\frac{d^2y}{dx^2} + y = 0$$", back: "Solutions are sine and cosine functions" }
        ]
    }
});

export default store;