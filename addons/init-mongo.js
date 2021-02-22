function seed(dbName, user, password) {
  db = db.getSiblingDB(dbName);
  db.createUser({
    user: user,
    pwd: password,
    roles: [{ role: 'readWrite', db: dbName }],
  });

  db.createCollection('api_keys');
  db.createCollection('lifts');

  db.api_keys.insert({
    metadata: 'To be used by the xyz manager',
    key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
    version: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  db.roles.insertMany([
    { id: 0, floor: 0, direction: 'UP', state: 'IDLE' },
  ]);
}

seed('test-blog-db', 'test-blog-db-user', 'test123');
seed('test-blog-test-db', 'test-blog-test-db-user', 'test123');
