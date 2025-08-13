/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/data_marketplace.json`.
 */
export type DataMarketplace = {
  "address": "5CkSqkGqrHKRzVWVRJGa1odNcaXo4bJnt9Sq2Npqpxpj",
  "metadata": {
    "name": "dataMarketplace",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "claimRevenue",
      "discriminator": [
        4,
        22,
        151,
        70,
        183,
        79,
        73,
        189
      ],
      "accounts": [
        {
          "name": "seller",
          "writable": true,
          "signer": true
        },
        {
          "name": "merkleDistributor",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  100,
                  105,
                  115,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "merkle_distributor.period_id",
                "account": "merkleDistributor"
              }
            ]
          }
        },
        {
          "name": "revenueClaim",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  118,
                  101,
                  110,
                  117,
                  101,
                  95,
                  99,
                  108,
                  97,
                  105,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "seller"
              },
              {
                "kind": "account",
                "path": "merkle_distributor.period_id",
                "account": "merkleDistributor"
              }
            ]
          }
        },
        {
          "name": "marketplaceConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "dataSeller",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  101,
                  108,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "seller"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "merkleProof",
          "type": {
            "vec": {
              "array": [
                "u8",
                32
              ]
            }
          }
        }
      ]
    },
    {
      "name": "createListing",
      "discriminator": [
        18,
        168,
        45,
        24,
        191,
        31,
        117,
        54
      ],
      "accounts": [
        {
          "name": "seller",
          "writable": true,
          "signer": true
        },
        {
          "name": "listing",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "marketplace_config.listing_counter",
                "account": "marketplaceConfig"
              }
            ]
          }
        },
        {
          "name": "marketplaceConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "dataSeller",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  101,
                  108,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "seller"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "startDate",
          "type": "i64"
        },
        {
          "name": "endDate",
          "type": "i64"
        },
        {
          "name": "pricePerDay",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeMarketplace",
      "discriminator": [
        47,
        81,
        64,
        0,
        96,
        56,
        105,
        7
      ],
      "accounts": [
        {
          "name": "marketplaceConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "purchaseDataPass",
      "discriminator": [
        91,
        103,
        210,
        91,
        78,
        217,
        207,
        74
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "dataPass",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  97,
                  116,
                  97,
                  95,
                  112,
                  97,
                  115,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "marketplace_config.pass_counter",
                "account": "marketplaceConfig"
              }
            ]
          }
        },
        {
          "name": "marketplaceConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "passNftMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  115,
                  115,
                  95,
                  110,
                  102,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "dataPass"
              }
            ]
          }
        },
        {
          "name": "buyerNftAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "buyer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "passNftMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "metadataAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "tokenMetadataProgram"
              },
              {
                "kind": "account",
                "path": "passNftMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "tokenMetadataProgram"
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "startDate",
          "type": "i64"
        },
        {
          "name": "endDate",
          "type": "i64"
        },
        {
          "name": "maxPricePerDay",
          "type": "u64"
        },
        {
          "name": "eligibilityMerkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "eligibleSellerCount",
          "type": "u32"
        },
        {
          "name": "countProof",
          "type": {
            "vec": {
              "array": [
                "u8",
                32
              ]
            }
          }
        }
      ]
    },
    {
      "name": "removeListing",
      "discriminator": [
        74,
        5,
        236,
        7,
        2,
        104,
        139,
        114
      ],
      "accounts": [
        {
          "name": "seller",
          "writable": true,
          "signer": true
        },
        {
          "name": "listing",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "listing.listing_id",
                "account": "dataListing"
              }
            ]
          }
        },
        {
          "name": "dataSeller",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  101,
                  108,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "seller"
              }
            ]
          }
        },
        {
          "name": "marketplaceConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "updateListing",
      "discriminator": [
        192,
        174,
        210,
        68,
        116,
        40,
        242,
        253
      ],
      "accounts": [
        {
          "name": "seller",
          "writable": true,
          "signer": true
        },
        {
          "name": "listing",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "listing.listing_id",
                "account": "dataListing"
              }
            ]
          }
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "newEndDate",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "newPricePerDay",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "updateMerkleRoot",
      "discriminator": [
        195,
        173,
        38,
        60,
        242,
        203,
        158,
        93
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketplaceConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "merkleDistributor",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  100,
                  105,
                  115,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "marketplace_config.snapshot_period",
                "account": "marketplaceConfig"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "dataListing",
      "discriminator": [
        75,
        232,
        231,
        86,
        134,
        68,
        100,
        8
      ]
    },
    {
      "name": "dataPass",
      "discriminator": [
        26,
        190,
        245,
        164,
        228,
        160,
        193,
        40
      ]
    },
    {
      "name": "dataSeller",
      "discriminator": [
        50,
        184,
        135,
        121,
        10,
        63,
        84,
        226
      ]
    },
    {
      "name": "marketplaceConfig",
      "discriminator": [
        169,
        22,
        247,
        131,
        182,
        200,
        81,
        124
      ]
    },
    {
      "name": "merkleDistributor",
      "discriminator": [
        77,
        119,
        139,
        70,
        84,
        247,
        12,
        26
      ]
    },
    {
      "name": "sellerRevenueClaim",
      "discriminator": [
        67,
        247,
        13,
        207,
        141,
        58,
        42,
        25
      ]
    }
  ],
  "events": [
    {
      "name": "dataPassPurchasedEvent",
      "discriminator": [
        93,
        232,
        113,
        30,
        125,
        116,
        133,
        206
      ]
    },
    {
      "name": "listingCreatedEvent",
      "discriminator": [
        73,
        147,
        169,
        146,
        121,
        205,
        118,
        3
      ]
    },
    {
      "name": "listingRemovedEvent",
      "discriminator": [
        13,
        249,
        232,
        178,
        22,
        186,
        24,
        183
      ]
    },
    {
      "name": "listingUpdatedEvent",
      "discriminator": [
        145,
        99,
        225,
        99,
        169,
        19,
        244,
        96
      ]
    },
    {
      "name": "merkleRootUpdatedEvent",
      "discriminator": [
        216,
        71,
        29,
        118,
        92,
        43,
        70,
        35
      ]
    },
    {
      "name": "revenueClaimedEvent",
      "discriminator": [
        3,
        254,
        199,
        131,
        59,
        87,
        87,
        232
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Not authorized to perform this action"
    },
    {
      "code": 6001,
      "name": "sellerAlreadyActive",
      "msg": "Seller account is already active"
    },
    {
      "code": 6002,
      "name": "sellerNotActive",
      "msg": "Seller account is not active"
    },
    {
      "code": 6003,
      "name": "noActiveSellers",
      "msg": "No active sellers available"
    },
    {
      "code": 6004,
      "name": "invalidPaymentAmount",
      "msg": "Invalid payment amount"
    },
    {
      "code": 6005,
      "name": "arithmeticOverflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6006,
      "name": "invalidDateRange",
      "msg": "Invalid date range"
    },
    {
      "code": 6007,
      "name": "invalidPrice",
      "msg": "Invalid price"
    },
    {
      "code": 6008,
      "name": "noDaysSelected",
      "msg": "No days selected"
    },
    {
      "code": 6009,
      "name": "tooManyDays",
      "msg": "Too many days selected"
    },
    {
      "code": 6010,
      "name": "dayOutOfRange",
      "msg": "Day out of listing range"
    },
    {
      "code": 6011,
      "name": "bidNotAccepted",
      "msg": "Bid not accepted"
    },
    {
      "code": 6012,
      "name": "alreadyClaimed",
      "msg": "Already claimed"
    },
    {
      "code": 6013,
      "name": "invalidMerkleProof",
      "msg": "Invalid merkle proof"
    },
    {
      "code": 6014,
      "name": "insufficientPoolBalance",
      "msg": "Insufficient pool balance"
    },
    {
      "code": 6015,
      "name": "insufficientBalance",
      "msg": "Insufficient balance"
    },
    {
      "code": 6016,
      "name": "sellerAlreadyHasListing",
      "msg": "Seller already has an active listing"
    },
    {
      "code": 6017,
      "name": "invalidSellerCount",
      "msg": "Invalid seller count"
    }
  ],
  "types": [
    {
      "name": "dataListing",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "listingId",
            "type": "u64"
          },
          {
            "name": "seller",
            "type": "pubkey"
          },
          {
            "name": "startDate",
            "type": "i64"
          },
          {
            "name": "endDate",
            "type": "i64"
          },
          {
            "name": "pricePerDay",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "dataPass",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "passId",
            "type": "u64"
          },
          {
            "name": "buyer",
            "type": "pubkey"
          },
          {
            "name": "startDate",
            "type": "i64"
          },
          {
            "name": "endDate",
            "type": "i64"
          },
          {
            "name": "maxPricePerDay",
            "type": "u64"
          },
          {
            "name": "totalPaid",
            "type": "u64"
          },
          {
            "name": "dataNftMint",
            "type": "pubkey"
          },
          {
            "name": "purchasedAt",
            "type": "i64"
          },
          {
            "name": "eligibilityMerkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "eligibleSellerCount",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "dataPassPurchasedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "passId",
            "type": "u64"
          },
          {
            "name": "buyer",
            "type": "pubkey"
          },
          {
            "name": "startDate",
            "type": "i64"
          },
          {
            "name": "endDate",
            "type": "i64"
          },
          {
            "name": "totalPaid",
            "type": "u64"
          },
          {
            "name": "eligibleSellerCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "dataSeller",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seller",
            "type": "pubkey"
          },
          {
            "name": "listingId",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "totalRevenue",
            "type": "u64"
          },
          {
            "name": "unclaimedRevenue",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "listingCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "listingId",
            "type": "u64"
          },
          {
            "name": "seller",
            "type": "pubkey"
          },
          {
            "name": "startDate",
            "type": "i64"
          },
          {
            "name": "endDate",
            "type": "i64"
          },
          {
            "name": "pricePerDay",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "listingRemovedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "listingId",
            "type": "u64"
          },
          {
            "name": "seller",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "listingUpdatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "listingId",
            "type": "u64"
          },
          {
            "name": "seller",
            "type": "pubkey"
          },
          {
            "name": "newEndDate",
            "type": "i64"
          },
          {
            "name": "newPricePerDay",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketplaceConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "currentPeriodRevenue",
            "type": "u64"
          },
          {
            "name": "totalLifetimeRevenue",
            "type": "u64"
          },
          {
            "name": "listingCounter",
            "type": "u64"
          },
          {
            "name": "passCounter",
            "type": "u64"
          },
          {
            "name": "snapshotPeriod",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "merkleDistributor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "totalPoolBalance",
            "type": "u64"
          },
          {
            "name": "snapshotTimestamp",
            "type": "i64"
          },
          {
            "name": "periodId",
            "type": "u64"
          },
          {
            "name": "totalClaims",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "merkleRootUpdatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "periodId",
            "type": "u64"
          },
          {
            "name": "merkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "totalPoolBalance",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "revenueClaimedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seller",
            "type": "pubkey"
          },
          {
            "name": "periodId",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "sellerRevenueClaim",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seller",
            "type": "pubkey"
          },
          {
            "name": "periodId",
            "type": "u64"
          },
          {
            "name": "amountClaimed",
            "type": "u64"
          },
          {
            "name": "claimTimestamp",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
