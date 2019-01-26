pipeline {
    agent { docker { image 'node:11.6.0' } }

    environment {
        //
        DISABLE_AUTH = 'true'
        DB_ENGINE    = 'sqlite'
    }

    stages {
        stage('build') {
            steps {
                retry(3) {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'printenv'
                }

                // sh 'npm i';
                sh 'npm i -g http-server'

                timeout(time: 3, unit: 'MINUTES') {
                    sh 'npm run build'
                }
            }
        }
    }

    post {
        always {
            echo 'This will always run'
            //
            echo "${env.JOB_NAME}"
            echo "${env.BUILD_NUMBER}"
            echo "${env.JOB_NAME}"
            echo "${env.JOB_NAME}"
            //
            archiveArtifacts artifacts: 'build/libs/**/*.jar', fingerprint: true
            junit 'build/reports/**/*.xml'
            // deleteDir() /* clean up our workspace */
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            //
            mail to: 'mikhailvetyugov@gmail.com',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
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
