#!/bin/bash

echo "=== LLM Guardrails API Test ==="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"

echo "✓ Testing homepage..."
curl -s "$BASE_URL" > /dev/null && echo -e "${GREEN}✓ Homepage loaded successfully${NC}" || echo -e "${RED}✗ Homepage failed${NC}"

echo ""
echo "Testing API endpoints (requires authentication - these will return 401)..."
echo ""

echo "1. Testing GET /api/profiles (should return 401)..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/profiles")
if [ "$RESPONSE" = "401" ]; then
    echo -e "${GREEN}✓ Correctly returns 401 (unauthorized)${NC}"
else
    echo -e "${YELLOW}⚠ Unexpected status: $RESPONSE${NC}"
fi

echo ""
echo "2. Testing GET /api/keys (should return 401)..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/keys")
if [ "$RESPONSE" = "401" ]; then
    echo -e "${GREEN}✓ Correctly returns 401 (unauthorized)${NC}"
else
    echo -e "${YELLOW}⚠ Unexpected status: $RESPONSE${NC}"
fi

echo ""
echo "3. Testing POST /api/validate without API key (should return 401)..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/validate" \
  -H "Content-Type: application/json" \
  -d '{"text":"test","validationType":"input"}')
if [ "$RESPONSE" = "401" ]; then
    echo -e "${GREEN}✓ Correctly returns 401 (missing API key)${NC}"
else
    echo -e "${YELLOW}⚠ Unexpected status: $RESPONSE${NC}"
fi

echo ""
echo "=== Test Complete ==="
echo ""
echo "To fully test the API:"
echo "1. Sign up at: $BASE_URL/sign-up"
echo "2. Create an API key in the dashboard"
echo "3. Run: curl -X POST $BASE_URL/api/validate \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -H 'x-api-key: YOUR_API_KEY' \\"
echo "     -d '{\"text\":\"My email is test@example.com\",\"validationType\":\"output\"}'"
