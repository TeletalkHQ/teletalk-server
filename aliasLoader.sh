#* How to run aliasLoader.sh? E.g. bash ./aliasLoader.sh

CURRENT_DIR=$(pwd)
COMMAND="source $CURRENT_DIR/aliases.sh"

loader() {
  RC_PATH="$HOME/.$1rc"

  if [ -f "$RC_PATH" ]; then
    if grep -q -x $COMMAND $RC_PATH; then
      echo "aliases already loaded!"
    else
      echo "$COMMAND" >>$RC_PATH
      echo "aliases loaded successfully"
      exec $1
    fi
  fi
}

#* if running bash
if [ -n "$BASH_VERSION" ]; then
  loader "bash"
  return
fi

#* if running zsh
if [ -n "$ZSH_VERSION" ]; then
  loader "zsh"
  return
fi

echo "Your shell does not support this script, manually copy the next line into your shell configuration:"
echo $COMMAND
