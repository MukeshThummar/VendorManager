import { setStoredVersion } from '@/constants/appDetails';
import { executeSql } from './dbService.js';
import { scripts } from '@/migration/version_1';


const migrationScript = async (currentVersion, storedVersion) => {
  console.info('Running migration script...', currentVersion, storedVersion);
  if (currentVersion !== storedVersion) {
    {
      switch (currentVersion) {
        case '1.0.0':
          for (const script of scripts) {
            try {
              const result = await executeSql(script + ';');
            } catch (error) {
              console.error('Error executing script:', script, error);
            }
          }
          await setStoredVersion(currentVersion);
          break;
        default:
          break;
      }
    }
  }  
};

export default migrationScript;