const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('Utility Functions', () => {

    // 1. capitalizeWords Tests
    describe('capitalizeWords()', () => {
        test('normal case: capitalizes the first letter of each word', () => {
            expect(capitalizeWords("hello world")).toBe("Hello World");
        });

        test('edge case: handles single-word strings', () => {
            expect(capitalizeWords("testing")).toBe("Testing");
        });

        test('edge case: handles empty strings', () => {
            expect(capitalizeWords("")).toBe("");
        });

        test('edge case: handles strings with special characters', () => {
            // Note: \b treats hyphens as word boundaries.
            expect(capitalizeWords("hello-world")).toBe("Hello-World");
        });
    });

    // 2. filterActiveUsers Tests
    describe('filterActiveUsers()', () => {
        test('normal case: filters active users from mixed array', () => {
            const users = [
                { name: "Alice", isActive: true },
                { name: "Bob", isActive: false },
                { name: "Charlie", isActive: true }
            ];
            const result = filterActiveUsers(users);
            expect(result).toEqual([
                { name: "Alice", isActive: true },
                { name: "Charlie", isActive: true }
            ]);
            expect(result).toHaveLength(2);
        });

        test('edge case: returns empty array if all users are inactive', () => {
            const users = [
                { name: "Bob", isActive: false },
                { name: "Dave", isActive: false }
            ];
            expect(filterActiveUsers(users)).toEqual([]);
        });

        test('edge case: handles empty input array', () => {
            expect(filterActiveUsers([])).toEqual([]);
        });
    });

    // 3. logAction Tests
    describe('logAction()', () => {
        test('normal case: generates correct log string with valid inputs', () => {
            const result = logAction("login", "Alice");
            // Validates structure: "User [User] performed [Action] at [ISO Date]"
            // Using Regex ensures we match the dynamic timestamp correctly.
            const regex = /^User Alice performed login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
            expect(result).toMatch(regex);
        });

        test('edge case: handles missing action or username gracefully', () => {
            // Function relies on template literal coercion of undefined
            const result = logAction(undefined, undefined);
            expect(result).toMatch(/^User undefined performed undefined at/);
        });

        test('edge case: handles empty strings as inputs', () => {
            const result = logAction("", "");
            expect(result).toMatch(/^User  performed  at/);
        });
    });
});