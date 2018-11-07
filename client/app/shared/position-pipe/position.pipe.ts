import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'refereePosition' })
export class RefereePositionPipe implements PipeTransform {
	transform(value: number): string {
		let positions: any = {
			0: 'Center',
			1: 'AssistantRef1',
			2: 'AssistantRef2',
			3: 'FourthOfficial'
		};
		const positionId = value || 0;
		return positions[positionId];
	}
}
