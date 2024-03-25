import { IsOptional, IsString } from "class-validator"

export class EditBookmarkDto {
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    descriptions?: string

    @IsString()
    @IsOptional()
    link?:string
}