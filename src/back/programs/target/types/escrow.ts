/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/escrow.json`.
 */
export type Escrow = {
  "address": "DYuG4KZ6S1A19aXzDwFhsCDiEHB99t4WgjF5xgbbxtRZ",
  "metadata": {
    "name": "escrow",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "claimCommitment",
      "discriminator": [
        170,
        102,
        241,
        51,
        54,
        29,
        2,
        46
      ],
      "accounts": [
        {
          "name": "commitment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  105,
                  116,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "commitment.user",
                "account": "commitment"
              },
              {
                "kind": "account",
                "path": "commitment.id",
                "account": "commitment"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
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
      "name": "createCommitment",
      "discriminator": [
        232,
        31,
        118,
        65,
        229,
        2,
        2,
        170
      ],
      "accounts": [
        {
          "name": "commitment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  105,
                  116,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "user",
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
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "unlockTime",
          "type": "i64"
        },
        {
          "name": "authority",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "forfeitCommitment",
      "discriminator": [
        211,
        98,
        44,
        226,
        160,
        195,
        45,
        63
      ],
      "accounts": [
        {
          "name": "commitment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  105,
                  116,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "commitment.user",
                "account": "commitment"
              },
              {
                "kind": "account",
                "path": "commitment.id",
                "account": "commitment"
              }
            ]
          }
        },
        {
          "name": "authority",
          "docs": [
            "Authority that can forfeit this commitment"
          ],
          "signer": true
        },
        {
          "name": "user",
          "docs": [
            "User whose commitment is being forfeited"
          ],
          "writable": true
        },
        {
          "name": "treasury",
          "docs": [
            "Treasury account"
          ],
          "writable": true
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
    }
  ],
  "accounts": [
    {
      "name": "commitment",
      "discriminator": [
        61,
        112,
        129,
        128,
        24,
        147,
        77,
        87
      ]
    }
  ],
  "events": [
    {
      "name": "commitmentClaimedEvent",
      "discriminator": [
        70,
        33,
        143,
        124,
        250,
        173,
        209,
        152
      ]
    },
    {
      "name": "commitmentCreatedEvent",
      "discriminator": [
        187,
        99,
        17,
        81,
        92,
        33,
        61,
        172
      ]
    },
    {
      "name": "commitmentForfeitedEvent",
      "discriminator": [
        48,
        21,
        40,
        115,
        163,
        186,
        85,
        94
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidUnlockTime",
      "msg": "Invalid unlock time"
    },
    {
      "code": 6001,
      "name": "stillLocked",
      "msg": "Commitment is still locked"
    },
    {
      "code": 6002,
      "name": "alreadyUnlocked",
      "msg": "Commitment has already been unlocked"
    },
    {
      "code": 6003,
      "name": "invalidUser",
      "msg": "Invalid user"
    },
    {
      "code": 6004,
      "name": "invalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6005,
      "name": "invalidTreasury",
      "msg": "Invalid treasury"
    }
  ],
  "types": [
    {
      "name": "commitment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "unlockTime",
            "type": "i64"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "commitmentClaimedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "commitment",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "unlockTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "commitmentCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "commitment",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "unlockTime",
            "type": "i64"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "commitmentForfeitedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "commitment",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "unlockTime",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
