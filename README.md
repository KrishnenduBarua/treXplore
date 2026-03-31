# TreXplore - Bangladesh Tourism Guide Website

A beautiful and interactive tourism guide website for discovering places across Bangladesh. Built with raw HTML, CSS, and JavaScript.

## Features

### Core Functionality

- **Browse Places**: Explore tourist destinations across all 8 divisions of Bangladesh
- **Search & Filter**: Search by name and filter by division and district
- **Place Details**: View comprehensive information about each destination
- **User Profiles**: Create and manage user profiles
- **Travel Blogs**: Write and read travel experiences for each place
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Pages Included

1. **index.html** - Home page with featured places and division filters
2. **places.html** - Browse all places with search and filter functionality
3. **place-detail.html** - Detailed view of individual places with blog section
4. **profile.html** - User profile management with tabs for overview, blogs, favorites, and settings
5. **login.html** - Login and signup forms with social auth options

## File Structure

```
Trexplore/
│
├── index.html           # Home page
├── places.html          # Places listing page
├── place-detail.html    # Individual place details page
├── profile.html         # User profile page
├── login.html           # Login/Signup page
├── styles.css           # Main stylesheet
├── script.js            # Main JavaScript file
├── data.js              # Sample data for places and blogs
└── README.md            # This file
```

## Sample Data

The website includes sample data for 12 popular tourist destinations in Bangladesh:

1. Cox's Bazar (Chittagong)
2. Sundarbans (Khulna)
3. Sajek Valley (Chittagong)
4. Ratargul Swamp Forest (Sylhet)
5. Srimangal Tea Gardens (Sylhet)
6. Paharpur Buddhist Vihara (Rajshahi)
7. Kuakata Beach (Barisal)
8. Saint Martin's Island (Chittagong)
9. Ahsan Manzil (Dhaka)
10. Jaflong (Sylhet)
11. Rangamati (Chittagong)
12. Kantajew Temple (Rangpur)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome 6** - Icons
- **Google Fonts** - Typography

## Design Features

- Modern gradient hero sections
- Card-based layouts
- Smooth transitions and hover effects
- Box shadows for depth
- Responsive navigation with hamburger menu
- Custom form elements
- Toggle switches for settings
- Star rating system
- Social sharing buttons

## Color Scheme

- Primary: #4f46e5 (Indigo)
- Primary Dark: #4338ca
- Secondary: #10b981 (Green)
- Text Dark: #1f2937
- Text Light: #6b7280
- Background: #f9fafb

## How to Use

1. **Open in Browser**: Simply open `index.html` in any modern web browser
2. **No Build Process**: No compilation or build steps required
3. **Local Development**: Can be served with any static file server

### Using Live Server (VS Code)

```bash
# Install Live Server extension in VS Code
# Right-click on index.html and select "Open with Live Server"
```

### Using Python's Built-in Server

```bash
# Navigate to the project directory
cd "C:\Krish Project\Trexplore"

# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Future Enhancements

The template is ready for you to customize. Some potential improvements:

- Connect to a backend API for dynamic data
- Add user authentication with a database
- Implement actual blog posting and storage
- Add image upload functionality
- Integrate Google Maps for locations
- Add booking/reservation features
- Implement real-time weather information
- Add user reviews and ratings system
- Create an admin panel for content management

## Customization Guide

### Adding New Places

Edit `data.js` and add new objects to the `placesData` array:

```javascript
{
    id: 13,
    name: "Your Place Name",
    division: "Division Name",
    district: "District Name",
    category: "Category",
    description: "Description here...",
    image: "image-url",
    rating: 4.5,
    bestTime: "Month to Month",
    entryFee: "Fee details",
    parking: "Parking info",
    food: "Food availability",
    accommodation: "Stay options",
    gettingThere: "Transportation details"
}
```

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* etc. */
}
```

### Modifying Images

Replace image URLs in `data.js` with your own images or use local images:

- Place images in an `images/` folder
- Update URLs: `image: "images/your-image.jpg"`

## Credits

- Images: Unsplash (sample images used)
- Icons: Font Awesome
- Fonts: System fonts (Segoe UI)

## License

This is a template project. Feel free to use and modify as needed for your project.

## Contact

For questions or suggestions about this template, please reach out.

---

**Note**: This is a frontend template with demo functionality. The login, signup, and blog posting features display success messages but don't actually store data. You'll need to implement backend functionality for a production application.
