import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto{
    @IsString()
    @IsOptional()
    todo?: string;

    @IsBoolean()
    @IsOptional()
    isComplete: boolean;
}
