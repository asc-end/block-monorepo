export interface GenesisToken {
    id: string;
    interface: string;
    mutable: boolean;
    burnt: boolean;
    
    authorities: Array<{
        address: string;
        scopes: string[];
    }>;
    
    compression: {
        asset_hash: string;
        compressed: boolean;
        creator_hash: string;
        data_hash: string;
        eligible: boolean;
        leaf_id: number;
        seq: number;
        tree: string;
    };
    
    content: {
        $schema: string;
        files: Array<{
            uri: string;
            cdn_uri?: string;
            mime?: string;
        }>;
        json_uri: string;
        links: {
            image: string;
        };
        metadata: {
            description: string;
            name: string;
            symbol: string;
            token_standard: string;
        };
    };
    
    creators: Array<{
        address: string;
        share: number;
        verified: boolean;
    }>;
    
    grouping: Array<{
        group_key: string;
        group_value: string;
    }>;
    
    ownership: {
        delegate: string;
        delegated: boolean;
        frozen: boolean;
        owner: string;
        ownership_model: string;
    };
    
    royalty: {
        basis_points: number;
        locked: boolean;
        percent: number;
        primary_sale_happened: boolean;
        royalty_model: string;
        target: string | null;
    };
    
    supply: {
        edition_nonce: number;
        print_current_supply: number;
        print_max_supply: number;
    };
    
    token_info: {
        associated_token_address: string;
        balance: number;
        decimals: number;
        freeze_authority: string;
        mint_authority: string;
        supply: number;
        token_program: string;
    };
}