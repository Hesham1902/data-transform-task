# Brands Data Transformation and Seeding

This project is designed to transform and extend a MongoDB collection of brands, addressing various inconsistencies and errors in the data. It also includes functionality to generate new seed data for the collection. The project is built using Node.js with TypeScript and Mongoose, leveraging Faker.js for data generation.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Data Transformation](#data-transformation)
- [Data Seeding](#data-seeding)
- [Exporting the Brands Collection](#exporting-the-brands-collection)
- [Documentation](#documentation)

## Overview

The project involves three main steps:

1. **Data Transformation**: Transforming the provided MongoDB collection of brands into a standardized format based on a given schema.
2. **Data Seeding**: Generating 10 new brand documents with correct schema adherence using Faker.js.
3. **Exporting the Brands Collection**: Exporting the transformed and extended brands collection as a JSON file.

## Prerequisites

- Node.js (v14.x or higher)
- mongoose (v8.x or higher)
- faker (v8.x or higher)

## Installation

1. Clone the repository:

```
  git clone https://github.com/Hesham1902/data-transform-task.git

```

2. Navigate to the project directory:
3.

```
  cd data-transform-task
```

3. Install dependencies:

```
  npm install

```

## Usage

### Scripts

- This script is used to insert new brand data into the MongoDB database. It runs the seeder.js script with the -i flag, which triggers the data insertion process.

```
  npm run seed:insert
```

- This script deletes all existing brand data from the MongoDB database. It runs the seeder.js script with the -d flag, which triggers the data deletion process.

```
  npm run seed:delete
```

- This script generates new brand data using Faker.js and saves it to the MongoDB database. It's useful for extending the database with additional brand data.

```
  npm run generate:new
```

To run the project, use the following command:

```
  npm run start
```

This command will perform the data transformation, seeding, and export the brands collection as a JSON file.

## Data Transformation

The project includes a script for transforming the data in the `brands` collection to ensure it adheres to a specific schema. This involves correcting inconsistencies and errors in the data.

## Data Seeding

The project can generate new brand documents with correct schema adherence using Faker.js. The generated data is then saved to the MongoDB database.

## Exporting the Brands Collection

After transforming the data and seeding new data, the `brands` collection can be exported as a JSON file.

## Documentation

The project includes an Excel file documenting the seed data cases, explaining what differentiates each case.
