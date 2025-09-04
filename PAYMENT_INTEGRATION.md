# Payment Integration Plan - GoodCode Programming Education

## Overview
This document outlines the payment integration strategy for the GoodCode platform, supporting subscription-based mentoring services and one-time payments.

## Payment Requirements

### Services & Pricing
1. **Free Trial** - No payment required
2. **Standard Mentoring** - $80/month subscription 
3. **Premium Mentoring** - $150/month subscription
4. **Self-Learning Curriculum** - $30 one-time payment
5. **School Consultations** - Free initial consultation, custom pricing

## Recommended Payment Stack

### Primary Provider: Stripe
- **Pros**: Excellent for subscriptions, supports Morocco, robust API
- **Features**: Recurring billing, trial periods, pro-ration, webhooks
- **Compliance**: PCI DSS Level 1, international banking support

### Backup Provider: PayPal
- **Pros**: Familiar to users, good international coverage
- **Use case**: Alternative payment method for one-time purchases

## Implementation Phases

### Phase 1: Basic Stripe Integration (Week 1-2)
```typescript
// Core components to build:
- Payment form component with Stripe Elements
- Subscription management dashboard
- Webhook endpoint for payment status updates
- Database schema for subscriptions and payments
```

### Phase 2: Subscription Management (Week 3)
```typescript
// Features:
- Plan upgrades/downgrades with pro-ration
- Pause/resume subscriptions
- Cancellation with retention flow
- Failed payment handling and dunning
```

### Phase 3: Advanced Features (Week 4)
```typescript
// Enhanced features:
- Multi-currency support (MAD, USD, EUR)
- Invoice generation and email delivery
- Usage-based billing for custom curriculums
- Integration with booking system
```

## Database Schema

```sql
-- Users table (extend existing)
ALTER TABLE users ADD COLUMN stripe_customer_id VARCHAR(255);
ALTER TABLE users ADD COLUMN subscription_status ENUM('active', 'past_due', 'canceled', 'trialing');

-- Subscriptions table
CREATE TABLE subscriptions (
  id VARCHAR(255) PRIMARY KEY,
  user_id INT REFERENCES users(id),
  stripe_subscription_id VARCHAR(255) UNIQUE,
  plan_type ENUM('standard', 'premium'),
  status VARCHAR(50),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
  id VARCHAR(255) PRIMARY KEY,
  user_id INT REFERENCES users(id),
  stripe_payment_intent_id VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50),
  service_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table (extend to link with payments)
ALTER TABLE bookings ADD COLUMN payment_id VARCHAR(255) REFERENCES payments(id);
```

## Integration Code Structure

```
/lib
  /stripe
    - client.ts (Stripe client configuration)
    - webhooks.ts (Webhook handlers)
    - subscriptions.ts (Subscription management)
    - payments.ts (One-time payment handling)

/components
  /payment
    - PaymentForm.tsx (Stripe Elements form)
    - SubscriptionCard.tsx (Current plan display)
    - BillingHistory.tsx (Payment history)
    - PlanUpgrade.tsx (Plan change interface)

/app
  /api
    /stripe
      - webhooks/route.ts (Webhook endpoint)
      - create-subscription/route.ts
      - create-payment/route.ts
      - manage-subscription/route.ts
```

## Moroccan Payment Considerations

### Local Payment Methods
1. **Bank Transfers** - Popular for larger amounts
2. **Cash on Delivery** - Not applicable for digital services
3. **Mobile Money** - Consider for future expansion

### Compliance
- **Tax**: Apply 20% VAT for Moroccan customers
- **Invoicing**: Generate proper invoices in Arabic/French
- **Banking**: Ensure compliance with Moroccan banking regulations

## Security Measures

### Data Protection
- Never store card details on servers
- Use Stripe's secure vault for all sensitive data
- Implement proper HTTPS and security headers
- Regular security audits and PCI compliance

### Fraud Prevention
- Enable Stripe Radar for fraud detection
- Implement rate limiting on payment endpoints
- Monitor for unusual payment patterns
- Require SCA (Strong Customer Authentication) for EU customers

## Testing Strategy

### Development Environment
```bash
# Stripe test mode configuration
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

### Test Scenarios
1. Successful subscription creation
2. Failed payment handling
3. Subscription upgrades/downgrades
4. Cancellation and refund flows
5. Webhook delivery failures

## Deployment Checklist

### Pre-Production
- [ ] Set up production Stripe account
- [ ] Configure webhook endpoints
- [ ] Test payment flows end-to-end
- [ ] Verify tax calculations
- [ ] Load test payment processing

### Production Launch
- [ ] Update environment variables
- [ ] Monitor webhook delivery
- [ ] Set up payment failure alerting
- [ ] Configure automated invoice emails
- [ ] Document customer support procedures

## Customer Support Integration

### Self-Service Features
- Billing history and invoice downloads
- Plan change interface
- Payment method updates
- Cancellation flow with retention offers

### Admin Tools
- Customer subscription overview
- Payment history and refund tools
- Failed payment notification system
- Revenue and churn analytics

## Cost Analysis

### Stripe Fees
- **Card payments**: 2.9% + 30¢ per transaction
- **International cards**: +1.5% additional
- **Subscriptions**: No additional fees
- **Estimated monthly cost**: ~$200-500 based on volume

### Development Time
- **Phase 1**: 40-50 hours
- **Phase 2**: 30-40 hours  
- **Phase 3**: 20-30 hours
- **Total**: 90-120 hours (~3-4 weeks)

## Next Steps

1. **Week 1**: Set up development Stripe account and basic integration
2. **Week 2**: Implement subscription creation and management
3. **Week 3**: Add webhook handling and edge cases
4. **Week 4**: Testing, security review, and production deployment

## Contact Integration

The payment system will integrate seamlessly with the existing booking modal:
- Free trials proceed directly to booking
- Paid plans require payment before booking confirmation
- School consultations remain free with custom billing post-consultation