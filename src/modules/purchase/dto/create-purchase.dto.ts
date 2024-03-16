import { IsNotEmpty } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty()
  private readonly purchase_date: Date;

  @IsNotEmpty()
  private readonly bill_no: number;

  @IsNotEmpty()
  private readonly supplier_name: string;

  @IsNotEmpty()
  private readonly purchase_item_name: string;

  @IsNotEmpty()
  private readonly weight: number;

  @IsNotEmpty()
  private readonly purchase_amount: number;

  @IsNotEmpty()
  private readonly adat: number;

  @IsNotEmpty()
  private readonly total_amount: number;
}
