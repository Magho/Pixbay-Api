import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default class ImageResults extends Component {

	constructor (props) {
		super(props);
		this.state = {
			open : false,
			currentImg : '',
		}
	}

	handelOpen = img => {
		this.setState({
			open : true,
			currentImg : img,
		});
	}

	handelClose = () => {
		this.setState({
			open : false,
		});
	}

	render() {

		let imageListContent;
		const { images } = this.props;

		if (images) {
			imageListContent = (
				<GridList cols={3}>
					{images.map(img => (
						<GridTile
							title = {img.tags} 
							key = {img.id}
							subtitle = {
								<span>
									by <strong> {img.user} </strong>
								</span>
							}
							actionIcon = {
								<IconButton onClick={this.handelOpen.bind(this, img.largeImageURL)}>
									<ZoomIn color="white" />
								</IconButton>
							}
						>
							<img
								src={img.largeImageURL}
								alt="" 
								style={{backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'contain'}}
							/>
						</GridTile>
					))}
				</GridList>
			)
		} else {
			imageListContent = null;
		}

		const actions = [
			<FlatButton label = "Close" primary={true} onClick={this.handelClose} />
		]

		return (
			<div>
				{imageListContent}
				<Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.handelClose}>
					<img src={this.state.currentImg} alt="" style={{ width : '100%' }} />
				</Dialog>
			</div>
		);
	}
}

ImageResults.propTypes = {
	images : PropTypes.array.isRequired,
}
