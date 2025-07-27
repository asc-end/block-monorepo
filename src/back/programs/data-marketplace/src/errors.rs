use anchor_lang::prelude::*;

#[error_code]
pub enum MarketplaceError {
    #[msg("Not authorized to perform this action")]
    Unauthorized,
    #[msg("Seller account is already active")]
    SellerAlreadyActive,
    #[msg("Seller account is not active")]
    SellerNotActive,
    #[msg("No active sellers available")]
    NoActiveSellers,
    #[msg("Invalid payment amount")]
    InvalidPaymentAmount,
    #[msg("Arithmetic overflow")]
    ArithmeticOverflow,
    #[msg("Invalid date range")]
    InvalidDateRange,
    #[msg("Invalid price")]
    InvalidPrice,
    #[msg("No days selected")]
    NoDaysSelected,
    #[msg("Too many days selected")]
    TooManyDays,
    #[msg("Day out of listing range")]
    DayOutOfRange,
    #[msg("Bid not accepted")]
    BidNotAccepted,
    #[msg("Already claimed")]
    AlreadyClaimed,
    #[msg("Invalid merkle proof")]
    InvalidMerkleProof,
    #[msg("Insufficient pool balance")]
    InsufficientPoolBalance,
    #[msg("Insufficient balance")]
    InsufficientBalance,
    #[msg("Seller already has an active listing")]
    SellerAlreadyHasListing,
    #[msg("Invalid seller count")]
    InvalidSellerCount,
}