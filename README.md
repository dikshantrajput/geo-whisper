# GeoWhisper

GeoWhisper is an anonymous, location-based messaging application. Users can post and read messages anonymously within a specified radius from their current location.

## Features

- **Anonymous Messaging:** Post messages anonymously without revealing your identity.
- **Location-Based:** Read messages that are near your current location within a specified range.

## Technologies Used

- **Frontend:** SvelteKit, Tailwind CSS
- **Backend:** Supabase

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/geowhisper.git
    cd geowhisper
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm run dev
    ```

4. **Open your browser and navigate to:**
    ```
    http://localhost:5173
    ```

## Usage

1. **Post a Message:**
    - Navigate to the "Share Your Whisper" section.
    - Write your message in the text area.
    - Click "Send Message" to post your message anonymously.

2. **Explore Nearby Messages:**
    - Navigate to the "Explore Nearby Whispers" section.
    - Adjust the radius slider to set the range within which you want to see messages.
    - Click "Get Nearby Messages" to load messages within the specified range.

## Components

### PostMessage.svelte
Handles the posting of anonymous messages.

### RadiusScroller.svelte
Displays messages within a specified radius from the user's current location.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- (Add any acknowledgments here)

