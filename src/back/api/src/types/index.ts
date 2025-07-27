export interface WebSocketMessage {
  type: string;
  payload?: any;
}

export interface MarketplaceWebSocketMessage extends WebSocketMessage {
  type: 'marketplace:listing_created' | 'marketplace:listing_updated' | 'marketplace:listing_removed' | 
        'marketplace:pass_purchased' | 'marketplace:revenue_claimed' | 'marketplace:snapshot_created';
  payload: {
    seller?: string;
    buyer?: string;
    listingId?: string;
    passId?: string;
    periodId?: string;
    amount?: string;
    timestamp: string;
  };
} 