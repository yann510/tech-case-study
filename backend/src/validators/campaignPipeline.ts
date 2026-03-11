type ValidationRule<T> = {
  field: keyof T;
  check: (value: any) => boolean;
  message: string;
};

export class ValidationPipeline<T extends Record<string, any>> {
  private rules: ValidationRule<T>[] = [];

  addRule(
    field: keyof T,
    check: (value: any) => boolean,
    message: string
  ): this {
    this.rules.push({ field, check, message });
    return this;
  }

  required(field: keyof T, message?: string): this {
    return this.addRule(
      field,
      (v) => v !== undefined && v !== null && v !== "",
      message || `${String(field)} is required`
    );
  }

  minLength(field: keyof T, min: number, message?: string): this {
    return this.addRule(
      field,
      (v) => typeof v === "string" && v.length >= min,
      message || `${String(field)} must be at least ${min} characters`
    );
  }

  isArray(field: keyof T, message?: string): this {
    return this.addRule(
      field,
      (v) => v === undefined || Array.isArray(v),
      message || `${String(field)} must be an array`
    );
  }

  validate(data: Partial<T>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    for (const rule of this.rules) {
      if (!rule.check(data[rule.field])) {
        errors.push(rule.message);
      }
    }
    return { valid: errors.length === 0, errors };
  }
}
