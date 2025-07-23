use anchor_lang::prelude::*;

#[error_code]
pub enum EscrowError {
    #[msg("Invalid unlock time")]
    InvalidUnlockTime,
    #[msg("Commitment is still locked")]
    StillLocked,
    #[msg("Commitment has already been unlocked")]
    AlreadyUnlocked,
    #[msg("Invalid user")]
    InvalidUser,
    #[msg("Invalid timestamp - must be within 5 seconds of current time")]
    InvalidTimestamp,
    #[msg("Invalid authority")]
    InvalidAuthority,
    #[msg("Invalid treasury")]
    InvalidTreasury,
}