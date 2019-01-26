pipeline {
    agent { docker { image 'node:11.6.0' } }

    environment {
        HOME = '.'
    }

    stages {
        stage('build') {
            steps {
                retry(3) {
                    sh 'printenv'
                }

                sh 'npm config set maxsockets 20'
                sh 'npm i -g http-server'
                sh 'sudo chown -R `whoami` /usr/local/lib/node_modules'
                sh 'npm i'
                sh 'cd dist'
                sh 'http-server'

                timeout(time: 3, unit: 'MINUTES') {
                    sh 'npm run build'
                }
            }
        }
    }

    post {
        always {
            echo 'This will always run'
            echo "${env.JOB_NAME}"
            echo "${env.BUILD_URL}"
            archiveArtifacts artifacts: 'build/libs/**/*.jar', fingerprint: true
            // deleteDir() /* clean up our workspace */
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
        }
    }
}
