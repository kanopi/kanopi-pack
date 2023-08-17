const glob = require('glob');
const packageDirectory = __dirname + '/src/';

const packageTree = {};
let treePointer;

try {
  let files = glob.sync(
    '**/*.js',
    {
      'cwd': packageDirectory
    }
  );
  if (files) {
    files.forEach((file) => {
      const nodeStructure = file.split('/');

      // Reset pointer to the tree base 
      treePointer = packageTree;

      for (let index = 0; index < nodeStructure.length; index++) {
        let segment = nodeStructure[index];
        let lastNode = nodeStructure.length - 1 === index;

        // Skip empty segments
        if ('' === segment) {
          continue;
        }

        if (!(segment in treePointer)) {
          if (lastNode && segment.endsWith('.js')) {
            let segmentName = segment.slice(0, -3).replace('.', '_');
            treePointer[segmentName] = require(packageDirectory + file);
            break;
          }

          treePointer[segment] = {};
        }

        treePointer = treePointer[segment];
      }
    });
  }
}
catch (exception) {
  console.log('Kanopi Pack cannot load its dependencies, please make sure NPM installed successfully.');
  console.log('Following is the internal exception found while attempting to load the Kanopi Pack environment:');
  console.log(exception);
}

if ({} === packageTree) {
  console.log('Kanopi Pack is not installed properly, its internal file structure is not found or unable to load. Check the NPM installation and permissions.');
}

module.exports = packageTree;
