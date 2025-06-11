// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_bitter_post.sql';
import m0001 from './0001_fuzzy_fabian_cortez.sql';
import m0002 from './0002_seed-basic.sql';
import m0003 from './0003_seed-origins.sql';
import m0004 from './0004_pale_cargill.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004
    }
  }
  