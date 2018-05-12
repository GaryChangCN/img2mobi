const kit = require('nokit')
const fs = require('fs')

module.exports = (task, option) => {
    option('--fix', 'lint auto fix')

    task('default', ['dev'], 'default task', () => {
        kit.log('\n>>>>>>> start >>>>>>>\n')
    })

    task('dev', ['tsc-w'], 'start app service', (opt) => {
        kit.spawn('./node_modules/.bin/noe', [
            '-w',
            'src/*.js',
            'src/index.js',
        ], {
            prefix: 'APP | :green'
        })
    })

    task('tsc-w', 'watch typescript', (opt) => {
        const args = [
            '-w',
            '*.ts',
            './node_modules/.bin/tsc',
            '--',
            '-w',
            '-p',
            'tsconfig.json'
        ]
        kit.spawn('./node_modules/.bin/noe', args, {
            prefix: 'TSC | :blue'
        })
    })

    task('tsc-p', 'typescript compile', kit.async(function * (opt) {
        
        const args = [
            '-p',
            './tsconfig.json'
        ]
        yield kit.spawn('./node_modules/.bin/tsc', args, {
            prefix: 'TSC | :green'
        })
    }))

    task('build', ['clean', 'lint', 'tsc-p'], 'build app', opt => {
        kit.log('\n>>>>>>> building >>>>>>>\n')
    })

    task('clean', 'clean dist', opt => {
        kit.remove('dist/**', { isForce: true })
    })

    task('lint', 'lint whole project', function (opts) {
        let conf = [
            '--force',

            '-t', 'stylish',
            '-c', 'tslint.json',

            'src/**/*.ts',
            '*.ts'
        ]

        if (opts.fix)
            conf.unshift('--fix')

        return kit.spawn('./node_modules/.bin/tslint', conf)
    })

}