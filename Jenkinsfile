pipeline {
    agent {
        label 'docker-slave'
    }

    environment {
        HOME = '.'
    }

    stages {
        stage('build') {
            steps {
                // retry(3) {
                //     sh 'printenv'
                //     sh 'whoami' // node
                // }

                // see https://stackoverflow.com/questions/33725639/npm-install-g-less-does-not-work
                // see https://stackoverflow.com/questions/52979927/npm-warn-checkpermissions-missing-write-access-to-usr-local-lib-node-modules

                timeout(time: 5, unit: 'MINUTES') {
                    sh 'printenv'

                    // sh 'echo "START OF LS"'
                    sh 'ls /'
                    // sh 'echo "END OF LS"'

                    nodejs(nodeJSInstallationName: 'Node 8.16.1') {
                      sh 'npm i'
                      sh 'npm run build'
                    }
                }
            }
        }

        stage('confirmation') {
            steps {
                input "Hi guys, can we proceed?"
            }
        }
    }

    post {
        always {
            echo "JOB NAME: ${env.JOB_NAME}"
            echo "BUILD URL: ${env.BUILD_URL}"
            archiveArtifacts artifacts: 'dist/**/*.js', fingerprint: true
            deleteDir()
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
