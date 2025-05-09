export type User = {
  name: string;
  document: string;
  email: string;
  phone: string;
};

type CurrencyResponse = {
  id: string;
  cotacao: number;
  faces: number[];
  nome: string;
};

export type Currency = CurrencyResponse & {
  order_config: OrderConfig[];
  total: number;
  total_value: number;
  formatted_currency_value: string;
};

export type OrderConfig = {
  currency_name: string;
  currency_id: string;
  value: number;
  qtd: number;
  total: number;
  total_value: number;
};

export type Order = {
  list: OrderConfig[];
  user: User;
  total: number;
  total_value: number;
};
