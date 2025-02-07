# Bandage Online Shopping Platform

**Author**: Muhammad Ubaid Hussain  
**Role**: Lead Developer, Bandage Online Shopping

---

## Overview

This document outlines the **technical foundation** and **enhanced workflow** for the **Bandage Online Shopping Platform**. It includes system architecture, key workflows, API endpoints, and a technical roadmap.

---

## Functionalities Implemented

1. **All Products Displayed Seamlessly**: Products are fetched and displayed properly using a custom API with data stored in Sanity.
2. **Add to Cart and Wishlist Functionalities**: Users can add products to their cart or wishlist based on availability.
3. **Real-Time Inventory Management**: The stock is updated in real-time. When a product is sold, the stock decreases. Out-of-stock products are automatically added to the wishlist instead of the cart. Conversely, in-stock products can only be added to the cart, not the wishlist.
4. **User Authentication**: Secure authentication for users.
5. **Search Bar and Filter Features**: Allows users to search and filter products effortlessly.
6. **Dynamic Routing**: Ensures smooth navigation between pages.
7. **AI Chatbot**: Integrated to assist users with queries.
8. **User Data Storage**: When a user buys a product, their data is stored in Sanity.
9. **Payment Integration with Stripe**: Secure and seamless payment processing.
10. **Order Tracking**: Users can track their orders.
11. **Real-Time Review System**: Allows users to leave reviews in real time.
12. **Email Notification System**: Users receive a confirmation email with purchase details after buying a product.

---

## System Architecture

### High-Level Diagram

[Frontend (Next.js)]
|
v
[Sanity CMS] <--------> [Product Data (Mock) API]
| ^
| |
[Third-Party APIs] <----> [(ShipEngine) Shipment Tracking API]
| |
| v
| [Payment Gateway (Stripe)]
|
v
[Authentication (Clerk)]

### Component Descriptions

- **Frontend (Next.js)**:

  - Provides a responsive and interactive user interface for browsing products, managing orders, and handling user authentication.
  - Fetches and displays data from the backend APIs in real-time.

- **Sanity CMS**:

  - Centralized backend for managing product information, user data, order records, and inventory.
  - Exposes APIs for dynamic data communication with the frontend.

- **Third-Party APIs**:

  1. **Shipment Tracking API (ShipEngine)**: Fetches real-time shipping updates and generates tracking details.
  2. **Payment Gateway (Stripe)**: Processes secure transactions and confirms payment status.

- **Authentication (Clerk)**:
  - Handles user registration, login, and session management.
  - Integrates with Sanity CMS to store user data securely.

---

## Key Workflows

### 1. User Registration

- **Process**:
  - User signs up via the frontend using Clerk.
  - Registration details are stored in Sanity CMS.

### 2. Product Browsing

- **Process**:
  - User navigates through product categories on the frontend.
  - Sanity CMS API fetches product data (name, price, stock, description, images).
  - Dynamic product listings are displayed on the frontend.

### 3. Order Placement

- **Process**:
  - User adds products to the cart and proceeds to checkout.
  - Order details (products, quantities, shipping address) are sent to Sanity CMS.
  - Payment is processed via Stripe.
  - A confirmation message is sent to the user's email, and the order is recorded in Sanity CMS.

### 4. Shipment Tracking

- **Process**:
  - After order placement, shipment details are updated using ShipEngine.
  - Real-time tracking information is displayed to the user on the frontend.

### 5. Inventory Management

- **Process**:
  - Product stock levels are managed in Sanity CMS.
  - Real-time stock updates are fetched from Sanity CMS.
  - Out-of-stock products are added to the wishlist instead of the cart.
  - In-stock products can be added to the cart and proceed to checkout.

---

## API Endpoints

| Endpoint             | Method | Purpose                            | Response Example                                                       |
| -------------------- | ------ | ---------------------------------- | ---------------------------------------------------------------------- |
| `/products`          | GET    | Fetch all product details          | `[ { "name": "Product Name", "slug": "product-slug", "price": 100 } ]` |
| `/order`             | POST   | Submit new order details           | `{ "orderId": 123, "status": "success" }`                              |
| `/shipment-tracking` | GET    | Fetch real-time tracking updates   | `{ "trackingId": "AB123", "status": "In Transit" }`                    |
| `/delivery-status`   | GET    | Fetch express delivery information | `{ "orderId": 456, "deliveryTime": "30 mins" }`                        |
| `/inventory`         | GET    | Fetch real-time stock levels       | `{ "productId": 789, "stock": 50 }`                                    |
| `/cart`              | POST   | Add product to cart                | `{ "cartId": 101, "items": [...] }`                                    |
| `/wishlist`          | POST   | Add product to wishlist            | `{ "wishlistId": 202, "items": [...] }`                                |

---

## Sanity Schema Example

```javascript
import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productTypes = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "additionalImages",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discountPrice",
      title: "Discount Price",
      type: "number",
      description: "Discounted price of the product (optional)",
      validation: (Rule) =>
        Rule.custom((discountPrice, context) => {
          const doc = context.document;
          if (doc && typeof doc.price === "number") {
            if (discountPrice && discountPrice >= doc.price) {
              return "Discount price must be less than the original price";
            }
          }
          return true;
        }),
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      description: "Indicates whether the product is currently in stock",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stock",
      title: "Stock Quantity",
      type: "number",
      description: "Number of items available in stock",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Rating from 0 to 5",
      validation: (Rule) => Rule.min(0).max(5).precision(1),
    }),
    defineField({
      name: "reviews",
      title: "Reviews Count",
      type: "number",
      description: "Number of reviews for the product",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
      inStock: "inStock",
      stock: "stock",
    },
    prepare({ title, subtitle, media, inStock, stock }) {
      return {
        title,
        subtitle: `$${subtitle} | ${inStock ? `In Stock (${stock})` : "Out of Stock"}`,
        media,
      };
    },
  },
});
```

# Technical Roadmap

This document outlines the technical roadmap for the **Bandage Online Shopping Platform**. It covers the development, testing, and launch phases, along with key features and workflows.

---

## Development Phase

### Authentication

- Implement user registration and login using **Clerk**.
- Integrate Clerk with **Sanity CMS** for user data storage.

### Product Management

- Create mock API for product data.
- Store product data in **Sanity CMS**.
- Fetch and display product data on dynamic frontend pages.

### Cart and Wishlist

- Implement add-to-cart functionality with real-time stock checks.
- Allow out-of-stock products to be added to the wishlist.
- Display total bill and a "Proceed to Checkout" button on the cart page.

### Payment Integration

- Integrate **Stripe** for secure payments.
- Use Stripe test account for development.
- Handle payment success and failure scenarios.

### Shipment Tracking

- Integrate **ShipEngine** for shipment tracking.
- Generate tracking numbers and display them on the frontend.
- Allow users to track their orders in real-time.

### Inventory Management

- Create API for real-time stock updates in **Sanity CMS**.
- Update stock levels upon order placement.
- Prevent out-of-stock products from being added to the cart.

---

## Testing Phase

### End-to-End Testing

- Test all workflows, including:
  - User registration.
  - Product browsing.
  - Cart management.
  - Checkout process.
  - Shipment tracking.
- Validate API responses and ensure data accuracy.

### Security Audits

- Conduct security audits for sensitive data handling, including:
  - User authentication.
  - Payment processing.

---

## Launch Phase

### Deployment

- Deploy the platform on a cloud hosting service (e.g., **Vercel**, **Netlify**).
- Monitor user feedback and optimize for performance.

### Post-Launch

- Collect user feedback for continuous improvement.
- Optimize API performance and frontend loading times.
- Scale infrastructure based on traffic and demand.

---

## Conclusion

This technical foundation outlines the architecture, workflows, and API endpoints for the **Bandage Online Shopping Platform**. The platform will provide a seamless eCommerce experience with:

- Robust authentication.
- Efficient inventory management.
- Real-time shipment tracking.
