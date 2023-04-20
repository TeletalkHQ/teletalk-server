ROOT_DIR=$(pwd)

COMMAND="source $ROOT_DIR/scripts/alias/aliases.sh"

remove_loader() {
  CONFIG_PATH="$HOME/.$1rc"

  if [ -f "$CONFIG_PATH" ]; then
    if grep -q -x "$COMMAND" "$CONFIG_PATH"; then
      sed -i "\|$COMMAND|d" "$CONFIG_PATH"
      echo "Aliases removed from $CONFIG_PATH"
    else
      echo "Aliases not found in $CONFIG_PATH"
    fi
  else
    echo "$CONFIG_PATH does not exist"
  fi
}

if [ -f "$HOME/.bashrc" ]; then
  remove_loader "bash"
fi

if [ -f "$HOME/.zshrc" ]; then
  remove_loader "zsh"
fi

echo "Done!"
