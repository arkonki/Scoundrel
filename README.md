# Scoundrel

A Solitaire Dungeon Crawler built with React, Vite, and Tailwind CSS. 

Survive a dungeon made entirely of a standard 52-card deck, balancing your health, managing weapon durability, and strategically fleeing when overwhelmed.

## Features

- **Strategic Gameplay:** Fight monsters (Spades & Clubs), manage weapon durability streaks (Diamonds), and heal strategically (Hearts).
- **Progressive Web App (PWA):** Fully installable on desktop and mobile devices. Works 100% offline.
- **Bilingual Support:** Play in English or Estonian, complete with thematic translations for all monsters, weapons, and combat logs.
- **Fluid Animations & Physics:** Built with Framer Motion for spring-loaded card mechanics and 3D hover tilts.
- **Tactile Feedback:** Features mobile device haptics and intense screen-shake effects for heavy damage.
- **Immersive Combat Log:** A narrative log tracks your journey, translating raw numbers into an RPG adventure.

## How to Play

Your goal is to survive the entire 52-card deck.

1. **The Room:** You face 4 cards at a time. After interacting with 3 of them, the room refills from the deck.
2. **Monsters (Spades & Clubs):** Face cards equal 11-14. Fighting barehanded deals their full value as damage to your health.
3. **Weapons (Diamonds):** Weapons absorb damage up to their value. You can only fight a monster with your weapon if the monster is weaker than the *last monster you defeated with that same weapon*. Equipping a new weapon resets this streak.
4. **Health Potions (Hearts):** Restore health up to their value (max 20). You may only drink **one potion per room**.
5. **Fleeing:** You can flee the room, shuffling the remaining cards back into the deck. However, you cannot flee two rooms in a row.

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (`motion/react`)
- **Icons:** Lucide React
- **PWA:** `vite-plugin-pwa`

## Running Locally

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```
