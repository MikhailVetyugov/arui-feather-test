pipeline {
    agent {
        docker {
            image 'node:11.6.0'
            args '--net host'
        }
    }

    environment {
        HOME = '.'
    }

    stages {
        stage('build') {
            steps {
                // retry(3) {
                //     sh 'printenv'
                // }

                // sh 'sysctl net.ipv4.ip_default_ttl=66'
                // sh 'sudo chown -R `whoami` /usr/local/lib/node_modules'

                sh '$PATH'
                sh 'whoami'

                timeout(time: 5, unit: 'MINUTES') {
                    sh 'npm i -g --verbose http-server'
                    sh 'npm i'
                    sh 'npm run build'
                }
            }
        }

        stage('Sanity check') {
            steps {
                input "Does the staging environment look ok?"
            }
        }
    }

    post {
        always {
            echo "JOB NAME: ${env.JOB_NAME}"
            echo "BUILD URL: ${env.BUILD_URL}"
            archiveArtifacts artifacts: 'build/libs/**/*.jar', fingerprint: true
            sh 'deleteDir()'
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
