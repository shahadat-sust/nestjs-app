import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "node:path";
import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config();

class ConfigService {

  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(key => this.getValue(key, true));
    return this;
  }

  public port() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV'
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [join(__dirname.replace('/config', ''), '/model/*.entity.{js,ts}')],
      migrationsTableName: 'migration',
      migrations: [join(__dirname.replace('/config', ''), '/migration/*.{js,ts}')],
      migrationsRun: false,
      synchronize: false,
      logging: true,
      ssl: this.isProduction(),
    }
  }
}

export const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
  ]);

export default new DataSource(configService.getTypeOrmConfig() as DataSourceOptions);
