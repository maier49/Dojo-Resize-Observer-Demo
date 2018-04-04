import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import Resize, { ContentRect } from '@dojo/widget-core/meta/Resize';
import * as css from './styles/card.m.css';

export class Card extends WidgetBase {

	protected _smallPredicate(contentRect: ContentRect) {
		return contentRect.width < 300;
	}

	protected render() {
		const { isSmall } = this.meta(Resize).get('root', {
			isSmall: this._smallPredicate
		});

		return v('div', { key: 'root', classes: [
				css.root,
				isSmall ? css.small : css.big
			] }, [
			v('div', { classes: css.badge }, [ isSmall ? 'small' : 'big' ]),
			v('div', { key: 'image', classes: css.figureHolder }, [
				v('div', { classes: css.figure })
			]),
			v('div', { key: 'body', classes: css.bodyHolder }, [
				v('h3', { classes: css.title }, [ `Card Title` ]),
				v('p', [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ])
			])
		]);
	}
}

export default Card;
