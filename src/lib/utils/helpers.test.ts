import { formatDate, formatCurrency, isValidEmail, truncateText } from './helpers';

describe('Helper functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date, 'dd.MM.yyyy')).toBe('15.01.2024');
    });

    it('should return empty string for invalid date', () => {
      expect(formatDate('invalid-date')).toBe('');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(299)).toContain('299');
      expect(formatCurrency(1299.50)).toContain('1');
    });
  });

  describe('isValidEmail', () => {
    it('should validate email correctly', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });
  });

  describe('truncateText', () => {
    it('should truncate text correctly', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
      expect(truncateText('Hi', 10)).toBe('Hi');
    });
  });
});