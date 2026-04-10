# Manual Testing Guide: Cló-Flash PoC

This guide contains step-by-step instructions to manually verify each of our unique pedagogical features within the live development environment.

## 1. Environment Setup
- **Launch server**: `npm run dev` in your terminal.
- **Link**: Open `http://localhost:5173` (or the port specified in your terminal).

## 2. Onboarding & UI Navigation

### TC-00a: Loading Sequence Verification
- **Action**: Reload the page in your browser.
- **Expected**: A smooth dark mode loading screen with "Cló-Flash" animating in from the sides, and a bouncing dot indicator. It should transition to the Onboarding walkthrough seamlessly.
- **Goal**: Verify UI polish and loading transition capabilities.

### TC-00b: Interactive Onboarding Flow
- **Action**: From the loading screen, verify the Onboarding slide "Traditional Irish Orthography". Click "Continue".
- **Action**: View "Visual Discrimination" visual aids and click "Continue".
- **Action**: Complete the Interactive Demo on the third slide by making a wrong choice (seeing the hint) and then the correct choice.
- **Expected**: The system should guide you fluidly back to the main "Welcome" orientation screen.
- **Goal**: Verify the interactive multi-view state machine handling the introductory sequence.

## 3. Phase 1 Verification (Basics)

### TC-01: Bionic Reading (Visual Check)
- **Action**: Look at the word segments in Gate 1.
- **Expected**: The first **1-2 characters** of each word segment should be noticeably **bolder** (font-weight: 900) than the rest of the segment.
- **Goal**: Verify visual "fixation points" for dyslexic users.

### TC-02: Progression Logic (Gate 1 -> 2)
- **Action**: Complete the 5 cards in Gate 1.
- **Expected**: Upon finishing the last card, the "GATE" indicator in the header will switch from **1** to **2**.
- **Goal**: Ensure the "Learning Loop" logic is active.

## 3. Phase 2 Verification (Lookalikes)

### TC-03: Ghost Trace & Visual Anchors
- **Action**: On a Gate 2 card (e.g., **fás**), click the **'s'** button (incorrect).
- **Expected**:
    1. The card should **shake**.
    2. A semi-transparent **'f'** (the correct letter) should appear over the question mark.
    3. An orange **bar** highlight should blink over the 'f' location.
- **Action**: Wait 4 seconds without clicking on an `f` word.
- **Expected**: A very faint, subtle pulse animation should appear on the f-bar or s-curve.
- **Goal**: Verify non-punitive immediate visual correction.

## 4. Phase 3 Verification (The Boss Level)

### TC-04: "Evil Twins" Unlock & Speed Bar
- **Action**: Complete Gate 2 (5 correct answers).
- **Expected**: A success screen should appear with the option: **"Enter Evil Twins Mode."**
- **Action**: Click "Enter Evil Twins Mode."
- **Expected**:
    1. A red **Speed Bar** should appear at the top of the card.
    2. The bar should shrink in real-time.
    3. Every correct answer should **加快 (speed up)** the bar for the next random card.
    4. Letting the bar reach zero should result in a **Life Loss** and trigger the Ghost Trace hint.
- **Goal**: Verify fluency pressure and stress-testing logic.

## 5. Reporting Issues
- **Font Problems**: If the script looks like standard Roman letters, check your `/static/fonts` folder for the `.woff2` files and re-sync the page.
- **Reactivity Errors**: If a card fails to advance, check the browser console for JavaScript errors.
