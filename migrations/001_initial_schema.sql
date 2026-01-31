-- Embaby Carpentry Database Schema
-- Run this in Neon SQL Editor: https://console.neon.tech

-- Offers/Coupons Table
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10, 2),
  code VARCHAR(50),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Carpentry Portfolio Table
CREATE TABLE IF NOT EXISTS carpentry_portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  images TEXT[], -- Array of image paths
  category VARCHAR(50) CHECK (category IN ('kitchens', 'bath', 'basement', 'deck-fences', 'sheds')),
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Woodworking Portfolio Table
CREATE TABLE IF NOT EXISTS woodworking_portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  images TEXT[], -- Array of image paths
  dimensions VARCHAR(100),
  materials VARCHAR(255),
  is_custom_build BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quote Submissions Table (Carpentry)
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  project_type VARCHAR(50),
  budget_range VARCHAR(50),
  timeline VARCHAR(50),
  message TEXT,
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Woodworking Inquiries Table
CREATE TABLE IF NOT EXISTS woodworking_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  product_id UUID REFERENCES woodworking_portfolio(id),
  product_name VARCHAR(255),
  is_custom_build BOOLEAN DEFAULT false,
  custom_build_description TEXT,
  delivery_type VARCHAR(20) CHECK (delivery_type IN ('pickup', 'delivery')),
  delivery_address TEXT,
  message TEXT,
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_offers_active ON offers(is_active, end_date);
CREATE INDEX IF NOT EXISTS idx_carpentry_portfolio_category ON carpentry_portfolio(category);
CREATE INDEX IF NOT EXISTS idx_carpentry_portfolio_featured ON carpentry_portfolio(is_featured);
CREATE INDEX IF NOT EXISTS idx_woodworking_portfolio_featured ON woodworking_portfolio(is_featured);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_woodworking_inquiries_created_at ON woodworking_inquiries(created_at);
