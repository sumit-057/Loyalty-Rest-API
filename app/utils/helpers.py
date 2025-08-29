import math
import secrets


POINTS_PER_100 = 10


REDEEM_TABLE = {
500: 50, # 500 points => ₹50
1000: 100 # 1000 points => ₹100
}


def calculate_points(rupees: int) -> int:
    if rupees <= 0:
        return 0
    blocks = rupees // 100
    return blocks * POINTS_PER_100




def generate_coupon_code() -> str:
# 16 hex chars
    return secrets.token_hex(8).upper()