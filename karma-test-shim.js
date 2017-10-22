// /*global jasmine, __karma__, window*/
Error.stackTraceLimit = 0; // "No stacktrace"" is usually best for testing.

// Uncomment to get full stacktrace output. Sometimes helpful, usually not.
// Error.stackTraceLimit = Infinity; //

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// builtPaths: root paths for output ("built") files
// get from karma.config.js, then prefix with '/base/' (default is 'src/')
const builtPaths = (__karma__.config.builtPaths || ['src/'])
  .map(p => `/base/${p}`);

__karma__.loaded = function () {
};

const isJsFile = (path) => path.slice(-3) == '.js'
const isSpecFile = (path) => /\.spec\.(.*\.)?js$/.test(path)

// Is a "built" file if is JavaScript file in one of the "built" folders
function isBuiltFile(path) {
  return isJsFile(path) &&
    builtPaths.reduce((keep, bp) => {
      return keep || (path.substr(0, bp.length) === bp);
    }, false);
}

const allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);

System.config({
  paths: {
    // paths serve as alias
    'npm:': 'node_modules/',
  },
  // Base URL for System.js calls. 'base/' is where Karma serves files from.
  baseURL: 'base/src/lib',
  // Extend usual application package list with test folder
  packages: {
    rxjs: {defaultExtension: 'js'},
    '': {defaultExtension: 'js'},
    src: {
      defaultExtension: 'js',
      meta: {
        './*.js': {
          loader: 'system-loader',
        },
      },
    },
  },
  // Map the angular umd bundles
  map: {
    'system-loader': 'demo/systemjs-angular-loader.js',
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    // date-fns (esm failed attempt)
    'date-fns/esm/startOfMonth': 'npm:date-fns/startOfMonth/index.js',
    'date-fns/esm/endOfMonth': 'npm:date-fns/endOfMonth/index.js',
    'date-fns/esm/isBefore': 'npm:date-fns/isBefore/index.js',
    'date-fns/esm/endOfWeek': 'npm:date-fns/endOfWeek/index.js',
    'date-fns/esm/addDays': 'npm:date-fns/addDays/index.js',
    // date-fns (works in tests but now TS complains)
    'date-fns/startOfMonth': 'npm:date-fns/startOfMonth/index.js',
    'date-fns/endOfMonth': 'npm:date-fns/endOfMonth/index.js',
    'date-fns/isBefore': 'npm:date-fns/isBefore/index.js',
    'date-fns/endOfWeek': 'npm:date-fns/endOfWeek/index.js',
    'date-fns/addDays': 'npm:date-fns/addDays/index.js',
    // date-fns (fuck javascript and fuck modules)
    'date-fns': 'npm:date-fns/index.js',
    'date-fns/fp': 'npm:date-fns/fp/index.js',
    // im desparate
    'date-fns/fp/startOfMonth': 'npm:date-fns/fp/startOfMonth/index.js',
    'date-fns/fp/endOfMonth': 'npm:date-fns/fp/endOfMonth/index.js',
    'date-fns/fp/isBefore': 'npm:date-fns/fp/isBefore/index.js',
    'date-fns/fp/endOfWeek': 'npm:date-fns/fp/endOfWeek/index.js',
    'date-fns/fp/addDays': 'npm:date-fns/fp/addDays/index.js',
    // Testing bundles
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
    '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
    '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',
    'rxjs': 'npm:rxjs',
    'src': 'src',
  },
});

initTestBed().then(initTesting);

function initTestBed() {
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing'),
  ])

    .then(providers => {
      const coreTesting = providers[0];
      const browserTesting = providers[1];

      coreTesting.TestBed.initTestEnvironment(
        browserTesting.BrowserDynamicTestingModule,
        browserTesting.platformBrowserDynamicTesting());
    })
}

// Import all spec files and start karma
function initTesting() {
  return Promise
    .all(allSpecFiles.map(moduleName => System.import(moduleName)))
    .then(__karma__.start, __karma__.error);
}
