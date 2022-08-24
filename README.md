# Clean Node Modules

Deletes all the `node_modules` subdirectories where the parent folder is contained within the specified folder.

The process is very slow.  I've not bothered to optimize it, as it is just a house-keeping job.

```bash
# make it a command line tool
cd clean_node_modules

# sudo may be required
npm link

cnm ~/clean_me

# remove cnm from your path
npm unlink
```
# clean_node_modules
