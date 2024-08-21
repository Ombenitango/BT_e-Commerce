## E-Commerce Electronics Store with SvelteKit and Sanity Studio

This project is an e-commerce electronics store built using the combination of SvelteKit and Sanity Studio.

### Project Structure:

- `store` directory: This directory contains the SvelteKit project, which is the public-facing storefront for your online store.
- `studio` directory: This directory contains the Sanity Studio, a user-friendly interface for managing your product data, including adding, editing, and deleting products.

### Getting Started:

1. **Environment Variables:**
   - Rename the `.env.example` files in both the `store` and `studio` directories to `.env`. These files will store sensitive information like project IDs and tokens.
   - Inside the `store/.env` file, replace the placeholders `SANITY_PROJECT_ID` and `SANITY_WRITE_TOKEN` with your actual project ID and write token obtained from your Sanity project.
   - In the `studio/.env` file, update the `SANITY_STUDIO_PROJECT_ID` with your Sanity project ID.

2. **SvelteKit Setup:**
   - **Installation:**
     - Clone this repository to your local machine.
     - Navigate to the `store` directory in your terminal.
     - Run `npm install` to install the project's dependencies.
   - **Development Server:**
     - Start the development server to see your store in action:
       ```bash
       npm run dev
       ```

3. **Sanity Studio Setup:**
   - **Installation:**
     - Navigate to the `studio` directory in your terminal.
     - Run `npm install` to install the required dependencies.
   - **Starting Studio:**
     - Launch Sanity Studio to begin managing your product data:
       ```bash
       npm run dev
       ```

**Guides:**

- **SvelteKit Getting Started Guide:** [https://kit.svelte.dev/docs/introduction](https://kit.svelte.dev/docs/introduction)
- **Sanity Studio Getting Started Guide:** [https://www.sanity.io/docs/getting-started-with-sanity](https://www.sanity.io/docs/getting-started-with-sanity)
# BT_e-Commerce
