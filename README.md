# HarvestHub — Farmer–Buyer Direct Marketplace

A responsive, front-end demonstration website built with **HTML, CSS and vanilla JavaScript**.

## Features
- Responsive landing page and marketplace
- Sample crop listings
- Search by crop, farmer or location
- Filter by category and sort by price
- Farmer crop-listing form
- Browser-local listing storage (`localStorage`)
- Buyer enquiry form that prepares a WhatsApp message when a phone number is available
- Mobile navigation and form validation

## Run locally
1. Download and extract the project ZIP.
2. Open the extracted `farmer_buyer_marketplace` folder in VS Code.
3. Open `index.html` in a browser, or install the **Live Server** extension.
4. Right-click `index.html` → **Open with Live Server**.

No build tools or package installation are required.

## Publish with GitHub Pages
1. Sign in at https://github.com/.
2. Create a **Public** repository, for example `harvesthub-marketplace`.
3. In the repository, choose **Add file → Upload files**.
4. Upload `index.html`, `style.css`, `script.js`, and `README.md` (keep them in the repository root).
5. Commit the files.
6. Open **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**.
8. Choose branch `main` and folder `/(root)`, then click **Save**.
9. Wait for deployment. In the Pages section, click **Visit site**.

The public address usually looks like:
`https://YOUR-USERNAME.github.io/harvesthub-marketplace/`

## Important project limitations
This is a **front-end prototype**, not a production marketplace:
- New listings are stored only in the current browser on the current device. They are not shared with other visitors.
- The sign-in button is a demo notice; there is no real authentication.
- Buyer enquiries open a prefilled WhatsApp message for the sample contact number; there is no server-side order processing.
- No real payment gateway, admin dashboard, database, identity verification, or secure user accounts are included.
- Sample crop listings, farmer names, phone numbers and prices are illustrative demo data. Verify or replace them before presenting as real information.
- Images and Google Fonts are loaded from external services and need an internet connection.

For a real multi-user deployment, add a backend API, database, authentication, server-side validation, and secure contact handling. GitHub Pages hosts static files only; it does not run a Flask/Node/PHP backend or MySQL database.

## Suggested viva explanation
“HarvestHub is a Farmer–Buyer Direct Marketplace. Farmers can publish crop information such as crop name, category, available quantity, expected harvest date, location and price per kilogram. Buyers can search, filter and sort crop listings, then prepare an enquiry to contact the farmer. HTML defines the structure, CSS provides responsive styling, and JavaScript handles search, filtering, form validation, listing creation and browser local storage. This version is a front-end prototype; shared data and secure login would require a backend and database.”
