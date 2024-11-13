
export interface BonoUsersTypes {
  id: string;
  name: string;
  type: number,
  active: boolean,
  code: string,
  totalUses: number | 0,
  availableUses: number | 5,
  expirationDate?: string,
}
