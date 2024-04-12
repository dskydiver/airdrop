pub fn is_valid_ethereum_address(address: String) -> bool {
    // Check if the address starts with '0x' and is 42 characters long
    if address.starts_with("0x") && address.len() == 42 {
        // Check if the rest of the address is hexadecimal
        for c in address[2..].chars() {
            if !c.is_ascii_hexdigit() {
                return false;
            }
        }
        true
    } else {
        false
    }
}
