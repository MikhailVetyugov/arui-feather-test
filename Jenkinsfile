pipeline {
    agent { docker { image 'node:11.6.0' } }
    stages {
        stage('build') {
            steps {
                sh 'echo "Hello World"'

                retry(3) {
                    sh 'node --version'
                    sh 'npm --version'
                }

                timeout(time: 3, unit: 'MINUTES') {
                    sh 'npm run build'
                    sh 'npm i -g http-server'
                }
            }
        }
    }

    post {
        always {
            echo 'This will always run'
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
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
