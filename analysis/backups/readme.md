The file testdata.aof contains some sample runs of the experiment.

To load it, run the following from the main experimentr directory:

    cp analysis/backups/testdata.aof appendonly.aof && redis-server redis.conf

After that is running, you can run the analysis scripts `pull.sh`, `convert.sh`, `analyze.sh`, and `workers.sh` directly.
