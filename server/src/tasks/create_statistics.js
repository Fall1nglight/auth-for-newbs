const db = require('../db/connection');

const statistics = db.get('statistics');

const docName = 'numOfEdited';

const createStatistics = async () => {
  try {
    const editCounter = await statistics.findOne({
      name: docName,
    });

    if (editCounter)
      throw new Error(`'${docName}' already exists in the database!`);

    await statistics.insert({ name: docName, value: 0 });

    console.log(`Sucessfully created '${docName}' in the database!`);
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
  }
};

createStatistics();
