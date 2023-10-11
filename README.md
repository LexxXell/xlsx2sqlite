# xlsx2sqlite Database Converter

This TypeScript library is designed to convert table files into an SQLite database. It scans a specified directory for supported table file formats (e.g., .xlsx, .xls, .csv, .ods), processes them, and stores the data in an SQLite database. The library allows you to define custom mappings for table columns and supports various file formats.

## Installation

```bash
yarn
```

Before using this library, make sure you have the following dependencies installed:

### Development Dependencies

- `@types/node` (^20.8.3)
- `@types/sqlite3` (^3.1.9)
- `@types/xlsx` (^0.0.36)
- `typescript` (^5.2.2)

### Dependencies

- `colors` (^1.4.0)
- `dotenv` (^16.3.1)
- `sqlite3` (^5.1.6)
- `xlsx` (^0.18.5)

You can install these dependencies using npm or yarn.

## Usage

To use this library, follow these steps:

1. Create a configuration file to define how table columns should be mapped. This configuration file can be found in `helpers/constants.helper.ts` and is named `mapTablePattern`. You can customize the mapping rules to match your specific dataset.

2. Place your table files in a directory specified by `xlsxDirectoryPath` (default is 'data'). Supported file formats include .xlsx, .xls, .csv, and .ods.

3. Run the `index.ts` file, which is the entry point of the library, to initiate the conversion process.

```bash
yarn dev
```

The library will scan the specified directory, process the files, and insert the data into an SQLite database.

## Configuration

The library provides various configuration options in the `helpers/constants.helper.ts` file. Here's a brief overview of these options:

- `mapTablePattern`: Defines how table columns should be mapped.

- `xlsxDirectoryPath`: Specifies the directory where table files are located.

- `myDatabase`: Initializes the SQLite database connection.

- `createDbQuery`: Defines the SQL query to create the database table.

- `transactionStep`: Sets the number of rows to insert in each transaction.

- `permittedExt`: Specifies the supported file extensions.

## Example

Here's an example of how to use the library:

```typescript
import {
  Logger,
  checkFileExt,
  getAllFilePaths,
  permittedExt,
  processFileAndPushInDB,
  xlsxDirectoryPath,
} from './helpers';

const logger = new Logger('MAIN');

async function main() {
  try {
    const filepaths = getAllFilePaths(xlsxDirectoryPath);
    for (let filepath of filepaths) {
      if (!checkFileExt(filepath, permittedExt)) {
        continue;
      }
      await processFileAndPushInDB(filepath);
    }
  } catch (e) {
    logger.error((e as Error).message);
  }
}

if (require.main === module) {
  main();
}
```

Feel free to customize the library and configuration to suit your specific needs.

## License

This library is open-source and available under the [MIT License](LICENSE).

For more information and detailed usage, please refer to the code and documentation.
