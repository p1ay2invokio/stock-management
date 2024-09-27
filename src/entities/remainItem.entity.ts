import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'onepointofsale.notificationitem' })
export class remainItemEntity {
    @PrimaryColumn({ name: 'Id' })
    Id: number

    @Column({ name: 'Message' })
    Message: string
}