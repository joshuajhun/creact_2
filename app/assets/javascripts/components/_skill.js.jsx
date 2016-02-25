var Skill = React.createClass({
  getInitialState() {
    return { editable: false }
  },

  handleEdit() {
    this.setState({ editable: true })
  },

  handleLevelChange(action) {
    var levels  = ['bad', 'halfbad', 'fantastic'];
    var level   = levels.indexOf(this.props.skill.level);

    if (this.levelCanBeChanged(action, level)) {
      var skill = this.updatedSkill()
      this.props.handleUpdate(skill);
    }
  },

  levelCanBeChanged(action, limit) {
    return action === 'up' && limit < 2 ||  action === 'down' && limit > 0;
  },

  getNewLevel(action, index) {
    var levels   = ['bad', 'halfbad', 'fantastic'];
    var change   = action === 'up' ? 1 : - 1;

    return action ? levels[index + change] : this.props.skill.level;
  },

  updatedSkill(action, index) {
    var id       = this.props.skill.id;
    var name     = this.props.skill.name;
    vardetails  = this.props.skill.details;

    var levels   = ['bad', 'halfbad', 'fantastic'];
    var change   = action === 'up' ? 1 : - 1;
    var newLevel = action ? levels[index + change] : this.props.skill.level;

    return {id: id, name: name, details: details, level: newLevel}
  },

  onUpdateLevel(action) {
    if (this.canChangeLevel(action)) {
      var level = this.getNewLevel(action)
      var skill = {id: this.props.skill.id, level: level }

      this.props.handleUpdate(skill);
    }
  },

  render() {
    var name = this.state.editable ? <input type='text' defaultValue={this.props.skill.name} />
                                   : <h3>{this.props.skill.name}</h3>
    var details = this.state.editable ? <textarea type='text' defaultValue={this.props.skill.details}></textarea>
                                      : <p>{this.props.skill.details}</p>
    return (
      <div className='skill-level'>
        <button type="button"
          className="btn btn-default btn-sm"
          onClick={this.handleLevelChange.bind(this, 'down')}>
        <span className="glyphicon glyphicon-triangle-bottom"></span>
            </button>

        <p><strong>Level:</strong> {this.props.skill.level}</p>

        <button type="button"
              className="btn btn-default btn-sm"
              onClick={this.handleLevelChange.bind(this, 'up')}>
        <span className="glyphicon glyphicon-triangle-top"></span>
        </button>
      </div>
    )
  }
});
